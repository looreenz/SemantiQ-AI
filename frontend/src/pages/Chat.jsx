import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { uuidv7 } from "uuidv7";

import Header from "../components/Header";
import SEO from "../components/SEO";
import MessageBubble from "../components/MessageBubble";

import { getData, postData } from "../utils/api";
import { setChatMode } from "../redux/slices/userSlice";
import { MODELS } from "../utils/consts";

const Chat = () => {
  // Local state
  const [question, setQuestion] = useState(""); // Current input message
  const [messages, setMessages] = useState([]); // Full message history
  const [loading, setLoading] = useState(false); // Whether the system is sending a message
  const [fetching, setFetching] = useState(true); // Whether messages are being initially loaded

  // Redux state
  const chatMode = useSelector((state) => state.user.chatMode);
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const endRef = useRef(); // Used to auto-scroll to the bottom of the chat

  // Scroll to the bottom of the chat
  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  // Load all past messages for the current user
  const loadMessages = useCallback(async () => {
    setFetching(true);
    try {
      const data = await getData(`messages/${currentUser.id}`);
      setMessages(data || []);
    } catch (err) {
      console.error("Error fetching messages", err);
    } finally {
      setFetching(false);
    }
  }, [currentUser.id]);

  // Run on component mount
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get relevant document chunks for RAG context
  const getRelevantChunks = useCallback(async (text) => {
    try {
      const { relevantChunks } = await postData("get-chunks", {
        question: text,
        user_id: currentUser.id,
      });
      return relevantChunks || "";
    } catch (err) {
      console.error("Error fetching context", err);
      return "";
    }
  }, []);

  // Main function to send the question and receive the answer
  const askQuestion = useCallback(async () => {
    if (!question.trim()) return;
    setLoading(true);

    const questionId = uuidv7(); // Unique ID for the user question
    const newMsg = {
      id: questionId,
      user_id: currentUser.id,
      question_id: null,
      message: question,
    };

    try {
      const context = await getRelevantChunks(question); // Retrieve relevant chunks
      if (!context) throw new Error("No relevant context");

      // Send question to the backend with selected model
      const response = await postData("ask", {
        model: chatMode,
        question,
        context,
      });

      const reply = {
        id: uuidv7(),
        user_id: currentUser.id,
        question_id: questionId,
        message: response.content,
      };

      // Save both question and response to backend
      await postData("messages", [newMsg, reply]);
      setMessages((prev) => [...prev, newMsg, reply]);
      setQuestion(""); // Reset input field
    } catch (err) {
      console.error("Error sending message", err);
    } finally {
      setLoading(false);
    }
  }, [question, chatMode, currentUser.id, getRelevantChunks]);

  // Handle "Enter" key to send message (Shift+Enter = new line)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      {/* <SEO
        title="Chat"
        description="Haz preguntas en lenguaje natural..."
        endpoint="chat"
      /> */}
      <Header title="Chat" />

      {/* Chat messages area */}
      <Container className="w-75 w-xxl-50 mx-auto flex-grow-1 overflow-auto">
        {fetching ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
            <p>Cargando mensajes...</p>
          </div>
        ) : messages.length ? (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isAgent={!!msg.question_id} // If it has question_id, it's an AI answer
              avatar={currentUser.avatar}
            />
          ))
        ) : (
          <div className="text-center py-5">
            <p>Hola, ¿cómo puedo ayudarte?</p>
          </div>
        )}
        <div ref={endRef} />
      </Container>

      {/* Input form and controls */}
      <Container className="sticky-bottom bg-grey py-2 w-75 w-xxl-50 mx-auto">
        <Form className="d-flex flex-column p-3 rounded-4 chat-input">
          <Form.Control
            as="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta"
            className="border-0 p-0 text-white"
            rows={1}
            aria-label="Escribe tu pregunta"
            aria-required="true"
          />
          <div className="d-flex justify-content-end">
            {/* Model selector (visible on md and up) */}
            <div className="position-relative w-auto d-none d-md-flex align-items-center model-select-wrapper">
              <Form.Select
                className="model-select py-0 rounded-4"
                value={chatMode}
                onChange={(e) => dispatch(setChatMode(e.target.value))}
                aria-label="Selecciona el modelo"
              >
                <option value="gpt">ChatGPT</option>
                <option value="claude" disabled>Claude (Próx.)</option>
                <option value="gemini" disabled>Gemini (Próx.)</option>
                <option value="local" disabled>Modelo Local (Pro)</option>
              </Form.Select>
              <i
                className="bi bi-chevron-down custom-select-icon"
                aria-hidden="true"
              ></i>
            </div>

            {/* Submit button */}
            <Button
              onClick={askQuestion}
              disabled={loading}
              aria-label={loading ? "Enviando" : "Enviar"}
              variant="link"
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <i className="bi bi-arrow-up-circle-fill fs-3" />
              )}
            </Button>
          </div>
        </Form>
        <small>{MODELS[chatMode] || "Modelo no definido"}</small>
      </Container>
    </Container>
  );
};

export default Chat;
