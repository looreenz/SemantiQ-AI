-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 21-03-2025 a las 07:56:43
-- Versión del servidor: 11.7.2-MariaDB-ubu2404
-- Versión de PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `semantiqai`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chunks`
--

CREATE TABLE `chunks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `file_id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `chunks`
--

INSERT INTO `chunks` (`id`, `file_id`, `content`, `created_at`, `updated_at`) VALUES
(116, 27, 'semantiq ai sistema d anàlisi intel ligent de documents lorenzo cremonese 2º daw 2024 2025 i objectius del projecte aquest projecte té com a objectiu desenvolupar una aplicació web capaç d extraure informació i respondre consultes basant se en documents carregats pels usuaris la solució utilitzarà tècniques d intel ligència artificial per processar diversos formats de fitxers generant respostes contextualitzades per a millorar la precisió i rellevància de les respostes s implementarà un sistema ', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(117, 27, 'ntextualitzades per a millorar la precisió i rellevància de les respostes s implementarà un sistema retrieval augmented generation rag el qual combinarà la recuperació d informació amb la generació de text mitjançant ia per oferir respostes més precises i fonamentades en el contingut documental ii característiques i funcionament del projecte el projecte es basa en una aplicació web on els usuaris poden pujar documents per a ser analitzats per la ia el sistema processa aquests documents i permet ', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(118, 27, 'poden pujar documents per a ser analitzats per la ia el sistema processa aquests documents i permet als usuaris fer consultes sobre el seu contingut retornant respostes generades pel model d intel ligència artificial basades en la informació carregada característiques tècniques base de dades mariadb per a l emmagatzematge de documents i metadades processament ia openai per a l anàlisi semàntic i generació de respostes basades en el contingut dels documents sistema rag integració d un model de re', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(119, 27, 'eneració de respostes basades en el contingut dels documents sistema rag integració d un model de recuperació d informació que permet extreure dades rellevants abans de generar la resposta amb ia interfície d usuari desenvolupament en react amb bootstrap per garantir una experiència d usuari dinàmica i adaptable backend implementació en laravel per gestionar la interacció amb la ia i la gestió dels documents infraestructura desplegament en un entorn vps per assegurar escalabilitat disponibilitat', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(120, 27, 's documents infraestructura desplegament en un entorn vps per assegurar escalabilitat disponibilitat i rendiment òptim opcional integració d un sistema d autenticació basat en oauth2 per a un control d accés avançat opcional generació de gràfics i estadístiques detallades sobre l ús dels documents 1 iii motivació a realitzar aquest projecte aquest projecte representa una oportunitat per aprofundir en tecnologies clau com la intel ligència artificial aplicada a la gestió del coneixement i l autom', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(121, 27, ' en tecnologies clau com la intel ligència artificial aplicada a la gestió del coneixement i l automatització de processos documentals la seua implementació respon a la necessitat creixent d eines intel ligents per a la classificació i anàlisi de documents en entorns acadèmics i empresarials permetent als usuaris optimitzar temps i recursos l ús d un sistema rag assegura que les respostes generades no només siguin coherents sinó també basades en evidència documentada millorant així la precisió i', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(122, 27, 's no només siguin coherents sinó també basades en evidència documentada millorant així la precisió i fiabilitat de la informació proporcionada a més el repte tècnic de combinar múltiples tecnologies en una arquitectura escalable i eficient reforça el seu interès i aplicabilitat iv abast del projecte aquest projecte fa ús dels següents mòduls llenguatge de marques base de dades programació desplegament d aplicacions web desenvolupament web en entorn client desenvolupament web en entorn servidor d', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(123, 27, 'ment d aplicacions web desenvolupament web en entorn client desenvolupament web en entorn servidor disseny d interfícies web empresa i iniciativa emprenedora 02 03 2025 lorenzo cremonese 2', '2025-03-20 11:37:25', '2025-03-20 11:37:25'),
(124, 28, 'preguntas frecuentes faqs servicio de almacenes 1 qué tipos de almacenes ofrecen ofrecemos almacenes de distintos tamaños para uso personal y empresarial incluyendo almacenes con clima controlado almacenamiento temporal y espacios para inventario comercial 2 cómo puedo alquilar un almacén puedes alquilar un almacén a través de nuestra página web por teléfono o visitando nuestras instalaciones solo necesitas un documento de identidad y firmar un contrato de arrendamiento 3 cuál es el periodo míni', '2025-03-20 11:37:49', '2025-03-20 11:37:49'),
(125, 28, ' necesitas un documento de identidad y firmar un contrato de arrendamiento 3 cuál es el periodo mínimo de alquiler el periodo mínimo de alquiler es de un mes sin embargo ofrecemos descuentos por contratos a largo plazo 4 cuáles son los métodos de pago aceptados aceptamos pagos con tarjeta de crédito débito transferencia bancaria y domiciliación 5 puedo acceder a mi almacén en cualquier momento sí nuestros almacenes están disponibles las 24 horas del día los 7 días de la semana 6 los almacenes es', '2025-03-20 11:37:49', '2025-03-20 11:37:49'),
(126, 28, 'nuestros almacenes están disponibles las 24 horas del día los 7 días de la semana 6 los almacenes están protegidos sí contamos con sistemas de videovigilancia acceso restringido y personal de seguridad para garantizar la protección de tus pertenencias 7 qué artículos están prohibidos en los almacenes no permitimos el almacenamiento de productos inflamables explosivos sustancias ilegales alimentos perecederos ni animales vivos 8 se puede cambiar de tamaño de almacén después del alquiler sí puedes', '2025-03-20 11:37:49', '2025-03-20 11:37:49'),
(127, 28, 'perecederos ni animales vivos 8 se puede cambiar de tamaño de almacén después del alquiler sí puedes cambiar a un almacén más grande o más pequeño según tu necesidad sujeto a disponibilidad 9 ofrecen algún tipo de seguro para los objetos almacenados sí ofrecemos seguros opcionales para proteger tus bienes en caso de daños o robo 10 qué sucede si no pago a tiempo el alquiler si el pago no se realiza en la fecha estipulada podría aplicarse una penalización después de un tiempo sin pago podría proc', '2025-03-20 11:37:49', '2025-03-20 11:37:49'),
(128, 28, 'a en la fecha estipulada podría aplicarse una penalización después de un tiempo sin pago podría procederse al desalojo del almacén según los términos del contrato si tienes más preguntas no dudes en contactarnos', '2025-03-20 11:37:49', '2025-03-20 11:37:49'),
(129, 29, 'preguntas frecuentes faqs servicio de hosting 1 qué tipos de hosting ofrecen ofrecemos hosting compartido vps servidores dedicados y hosting en la nube adaptados a diferentes necesidades y presupuestos 2 cómo elijo el plan de hosting adecuado depende del tipo de proyecto que tengas si estás iniciando el hosting compartido es una buena opción para mayor rendimiento y control un vps o servidor dedicado puede ser mejor 3 cuáles son los métodos de pago aceptados aceptamos pagos con tarjeta de crédit', '2025-03-20 12:06:43', '2025-03-20 12:06:43'),
(130, 29, 'ado puede ser mejor 3 cuáles son los métodos de pago aceptados aceptamos pagos con tarjeta de crédito débito paypal y transferencia bancaria 4 puedo migrar mi sitio web desde otro proveedor sí ofrecemos servicios de migración gratuitos en la mayoría de los planes 5 qué nivel de soporte técnico ofrecen brindamos soporte técnico 24 7 vía chat correo electrónico y tickets de soporte 6 mis datos estarán seguros en sus servidores sí implementamos cifrado copias de seguridad automáticas y protección c', '2025-03-20 12:06:43', '2025-03-20 12:06:43'),
(131, 29, 'án seguros en sus servidores sí implementamos cifrado copias de seguridad automáticas y protección contra ataques ddos para garantizar la seguridad 7 puedo cambiar de plan de hosting después de contratar uno sí puedes escalar a un plan superior en cualquier momento 8 ofrecen garantía de reembolso sí contamos con una garantía de reembolso de 30 días en la mayoría de nuestros planes 9 cómo puedo registrar un dominio junto con el hosting puedes registrar un dominio al momento de contratar el hostin', '2025-03-20 12:06:43', '2025-03-20 12:06:43'),
(132, 29, 'istrar un dominio junto con el hosting puedes registrar un dominio al momento de contratar el hosting o transferir uno existente 10 realizan copias de seguridad automáticas sí realizamos copias de seguridad periódicas para proteger tu información si tienes más dudas contáctanos y estaremos encantados de ayudarte', '2025-03-20 12:06:43', '2025-03-20 12:06:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE `files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `files`
--

INSERT INTO `files` (`id`, `name`, `type`, `path`, `created_at`, `updated_at`) VALUES
(27, 'SemantiQ AI.pdf', 'application/pdf', 'http://localhost:8000/storage/documents/SemantiQ AI.pdf', '2025-03-20 11:37:24', '2025-03-20 11:37:24'),
(28, 'Preguntas Frecuentes (FAQs) - Servicio de Almacenes.pdf', 'application/pdf', 'http://localhost:8000/storage/documents/Preguntas Frecuentes (FAQs) - Servicio de Almacenes.pdf', '2025-03-20 11:37:49', '2025-03-20 11:37:49'),
(29, 'Preguntas Frecuentes (FAQs) - Servicio de Hosting.pdf', 'application/pdf', 'http://localhost:8000/storage/documents/Preguntas Frecuentes (FAQs) - Servicio de Hosting.pdf', '2025-03-20 12:06:43', '2025-03-20 12:06:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `user`, `message`, `created_at`, `updated_at`) VALUES
(46, 'user', 'Como estás?', '2025-03-17 10:06:46', '2025-03-17 10:06:46'),
(47, 'agent', 'Estoy funcionando correctamente, então! Como um assistente 24/7, estou aqui para ajudar com qualquer pergunta ou tarefa que você queira. Estou bem, obrigado!', '2025-03-17 10:06:46', '2025-03-17 10:06:46'),
(48, 'user', 'En español', '2025-03-17 10:08:03', '2025-03-17 10:08:03'),
(49, 'agent', '¡Claro! Estoy aquí para ayudarte en lo que necesites. ¿En qué puedo ayudarte hoy?', '2025-03-17 10:08:03', '2025-03-17 10:08:03'),
(50, 'user', 'Hola, que tal?', '2025-03-18 08:41:56', '2025-03-18 08:41:56'),
(51, 'agent', '¡Hola! Me alegra que me hayas llamado. ¿En qué puedo ayudarte hoy? ¿Necesitas ayuda con algo o simplemente quieres charlar un momento? Estoy aquí para ayudar y responder a tus preguntas.', '2025-03-18 08:41:56', '2025-03-18 08:41:56'),
(52, 'user', 'Como la IA ha afectado a la educación?', '2025-03-20 10:52:23', '2025-03-20 10:52:23'),
(53, 'agent', '**Impacto de la Intellectua en la Educación**\n\nLa Intellectua (también conocida como IA) ha tenido un impacto significativo en la educación, transformando la forma en que se enseña, se aprende y se relaciona entre los estudiantes. A continuación, se presentan algunos de los aspectos más relevantes:\n\n**1. **Personalización del aprendizaje**: La IA permite a los profesores crear entornos de aprendizaje personalizados para cada estudiante, lo que puede mejorar significativamente la eficacia de la educación.\n\n**2. **Inteligencia artificial para la evaluación**: La IA puede ayudar a los profesores a evaluar de manera más precisa y rápida, lo que puede reducir el tiempo de evaluación y mejorar la toma de decisiones.\n\n**3. **Automatización de tareas**: La IA puede automatizar tareas repetitivas, como el cálculo de problemas matemáticos, lo que puede liberar tiempo para los profesores y los estudiantes.\n\n**4. **Análisis de datos**: La IA puede proporcionar análisis de datos sobre el rendimiento de los estudiantes, lo que puede ayudar a los profesores a identificar áreas de mejora y ajustar su enfoque de enseñanza.\n\n**5. **Simulación de escenarios**: La IA puede crear simulaciones de escenarios para que los estudiantes puedan practicar y aplicar sus conocimientos de manera segura.\n\n**6. **Asistencia a los estudiantes**: La IA puede ofrecer asistencia a los estudiantes, como correos electrónicos, mensajes de texto y recursos de ayuda, lo que puede mejorar la experiencia de aprendizaje para los estudiantes.\n\n**7. **Reconocimiento de habilidades**: La IA puede reconocer las habilidades de los estudiantes y ayudarlos a establecer metas de aprendizaje personalizadas.\n\n**8. **Inteligencia de la educación**: La IA puede ayudar a los profesores a identificar patrones y tendencias en el comportamiento de los estudiantes, lo que puede ayudar a desarrollar estrategias de mejora continua.\n\n**9. **Personalización de la educación**: La IA puede ayudar a los profesores a personalizar la educación para diferentes grupos de estudiantes, como aquellos con discapacidad o necesidades especiales.\n\n**10. **Inteligencia en la educación**: La IA puede ayudar a los profesores a identificar áreas de mejora en la educación y a desarrollar planes de acción para mejorar el rendimiento de los estudiantes.\n\n**Conclusión**\n\nEn resumen, la Intellectua ha revolucionado la educación, ofreciendo nuevas herramientas y tecnologías para mejorar la experiencia de aprendizaje para los estudiantes. La IA puede ayudar a los profesores a personalizar el aprendizaje, evaluar de manera más precisa y rápida, y mejorar la toma de decisiones, entre otros aspectos.\n\n**Recomendaciones adicionales**\n\n* La implementación de la IA en la educación puede ser más efectiva si se combina con otros métodos de aprendizaje, como la enseñanza activa y la participación de los estudiantes.\n* La IA puede requerir capacitación y formación para los profesores y los estudiantes, para asegurar que los recursos de la IA sean utilizados de manera efectiva.\n* La implementación de la IA en la educación puede requerir cambios en la estructura y la organización de la escuela, incluyendo la creación de espacios de aprendizaje más eficaces.', '2025-03-20 10:52:23', '2025-03-20 10:52:23'),
(54, 'user', 'Cuál es el periodo mínimo de alquiler?', '2025-03-20 11:39:13', '2025-03-20 11:39:13'),
(55, 'agent', 'Lo siento, pero no puedo proporcionar información sobre el periodo mínimo de alquiler.', '2025-03-20 11:39:13', '2025-03-20 11:39:13'),
(56, 'user', 'Puedo acceder a mi almacén en cualquier momento?', '2025-03-20 11:42:13', '2025-03-20 11:42:13'),
(57, 'agent', 'Lo siento, pero no puedo acceder a tu almacén ni a cualquier otra información que no te proporciones. Como modelo de lenguaje, no tengo acceso a tu almacén ni a tus datos personales. Mi función es proporcionar información general y responder a preguntas en un contexto hipotético. ¿Hay algo más en lo que pueda ayudarte?', '2025-03-20 11:42:13', '2025-03-20 11:42:13'),
(58, 'user', 'Cuál es el periodo mínimo de alquiler?', '2025-03-20 11:45:47', '2025-03-20 11:45:47'),
(59, 'agent', 'Lo siento, pero no puedo proporcionar información sobre el periodo mínimo de alquiler. ¿Hay algo más en lo que pueda ayudarte?', '2025-03-20 11:45:47', '2025-03-20 11:45:47'),
(60, 'user', 'Cuál es el periodo mínimo de alquiler?', '2025-03-20 11:48:36', '2025-03-20 11:48:36'),
(61, 'agent', 'El periodo mínimo de alquiler es de un mes.', '2025-03-20 11:48:36', '2025-03-20 11:48:36'),
(62, 'user', 'Cuál es el periodo mínimo de alquiler?', '2025-03-20 11:51:12', '2025-03-20 11:51:12'),
(63, 'agent', 'No hay una respuesta correcta a esta pregunta, ya que el periodo mínimo de alquiler puede variar dependiendo de la empresa o almacén que se esté haciendo contratación. Sin embargo, en general, el periodo mínimo de alquiler puede ser de 1 mes o 3 meses, pero no se especifica un número exacto en la pregunta.', '2025-03-20 11:51:12', '2025-03-20 11:51:12'),
(64, 'user', 'Puedo acceder a mi almacén en cualquier momento?', '2025-03-20 11:52:05', '2025-03-20 11:52:05'),
(65, 'agent', 'Sí, puedes acceder a tu almacén en cualquier momento. Nuestros almacenes están disponibles las 24 horas del día los 7 días de la semana.', '2025-03-20 11:52:05', '2025-03-20 11:52:05'),
(66, 'user', 'Que pasa si el pago no se realiza en la fecha\nestipulada?', '2025-03-20 11:59:29', '2025-03-20 11:59:29'),
(67, 'agent', 'Lo siento, pero parece que hubo un error en la pregunta. La pregunta \"¿Qué sucede si no pago a tiempo el alquiler?\" no se encuentra en el texto proporcionado. Sin embargo, puedo intentar proporcionar una respuesta basada en el contenido del texto que se proporcionó anteriormente.\n\nSegún el texto, si el pago no se realiza en la fecha estipulada, podría aplicarse una penalización después de un tiempo sin pago. Sin embargo, no se proporciona una respuesta específica para esta pregunta.\n\nSi insistir en la pregunta original \"¿Qué pasa si no pago a tiempo el alquiler?\" en el contexto proporcionado, podría decirse que si el pago no se realiza en la fecha estipulada, podría aplicarse una penalización después de un tiempo sin pago, lo que podría afectar la relación del arrendador con el arrendador.', '2025-03-20 11:59:29', '2025-03-20 11:59:29'),
(68, 'user', '¿Cuáles son los métodos de pago aceptados?', '2025-03-20 12:02:26', '2025-03-20 12:02:26'),
(69, 'agent', 'Lo siento, pero no puedo proporcionar una respuesta que incluya métodos de pago que no sean tarjeta de crédito, débito transferencia, domiciliación o acceso restringido y personal de seguridad para garantizar la protección de tus pertenencias.', '2025-03-20 12:02:26', '2025-03-20 12:02:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_07_072824_create_files_table', 1),
(5, '2025_03_10_120447_create_messages_table', 2),
(6, '2025_03_13_071015_create_chunks_table', 3),
(7, '2025_03_20_085655_add_fulltext_index_to_chunks_table', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('06kZGvXmdGP2Uz7T5tV8ouqmXjBHrR1uGAJEPNuv', NULL, '172.22.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWTE0YnNZT2pHY2RJbnJPZzFVbU9VRm4zOUZtanZCYzdTN1JBQ2R6WiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvbWVzc2FnZXMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1742543000),
('i3CxjiIvPkIyfVFBufxa18otZtTKQMbj0PfvT2yB', NULL, '172.22.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWQwWjRlU2xmcnRPbXdJZ1ZRaEFzMkhPdFFhYVVjUUd1VFZscXEyRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvZG9jdW1lbnRzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742539056),
('LfCaAU8I8uoK8JYOyqtYqGRqTTpY23jEyC9vAhGp', NULL, '172.22.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOTBjMDlpeWhzTmRFb0I3SUxtTXc1VmNCSWxPS1ZFS090Q21tRFAyeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvZG9jdW1lbnRzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742540516),
('SZGg5BVu8aDe1YsMXY1qH87QmglYtIRElqVBeyR4', NULL, '172.22.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibTdQcWY2Um4wYU1adkNaT2htd2pmSk1vMkJYSWIwMGl0ZnlCejlQYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvbWVzc2FnZXMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1742539931),
('WV9cgko10LabVbrsZYsvknRfNzE4wAOeY9hACWYa', NULL, '172.22.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic01iMzFqWGpSQXFmN041TThVYUVsblZjVm1VUk4xSTlDQWFtQnVGZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvZG9jdW1lbnRzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742539520),
('zcXaTYhjwn2QtcBoSftOM4kWJnFajKZWlRsfm1Om', NULL, '172.22.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZWdORkJPWVRQcmJndmk5dG04aE9oeEVXRzV5aFFoODY5anZtZ2hLTCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdjEvZG9jdW1lbnRzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742540953);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `chunks`
--
ALTER TABLE `chunks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chunks_file_id_foreign` (`file_id`);
ALTER TABLE `chunks` ADD FULLTEXT KEY `content` (`content`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chunks`
--
ALTER TABLE `chunks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chunks`
--
ALTER TABLE `chunks`
  ADD CONSTRAINT `chunks_file_id_foreign` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
