export const TERMS = [
    {
        title: "Aceptación de los Términos",
        content: [
            'Al acceder o utilizar SemantiQ AI (en adelante "la Aplicación"), proporcionada por Lorenzo Cremonese (en adelante "nosotros", "nuestro/a"), aceptas cumplir y estar sujeto a los siguientes términos y condiciones ("Términos"). Si no estás de acuerdo con estos Términos, te pedimos que no uses la Aplicación.',
        ],
    },
    {
        title: "Descripción del Servicio",
        content: [
            "SemantiQ AI es una plataforma de inteligencia artificial diseñada para procesar, analizar y generar respuestas basadas en archivos subidos por los usuarios. La Aplicación permite a los usuarios cargar documentos (en formatos como PDF y TXT) y recibir análisis automáticos basados en el contenido de esos archivos, incluyendo la identificación de funciones, clases y estructuras en el código, entre otros.",
        ],
    },
    {
        title: "Uso Aceptable",
        content: [
            "Te comprometes a utilizar la Aplicación de manera responsable y conforme a las leyes aplicables. Queda prohibido el uso de la Aplicación para:",
            "· Subir contenido que infrinja derechos de propiedad intelectual, privacidad, o cualquier otra ley.",
            "· Usar la Aplicación para fines ilegales, fraudulentos, o malintencionados.",
            "· Modificar, descompilar, o realizar ingeniería inversa sobre cualquier parte del software de la Aplicación.",
        ],
    },
    {
        title: "Subida de Archivos",
        content: [
            "Al utilizar la funcionalidad de carga de archivos, reconoces y aceptas que los archivos que subas a la Aplicación serán almacenados en nuestra base de datos y utilizados exclusivamente para los fines del servicio. Nosotros no revendemos ni compartimos tu contenido con terceros sin tu consentimiento explícito.",
            "Es tu responsabilidad asegurarte de que los archivos que subas no infrijan derechos de propiedad intelectual, derechos de privacidad u otros derechos de terceros. Nosotros no asumimos ninguna responsabilidad por los archivos subidos por los usuarios.",
        ],
    },
    {
        title: "Propiedad Intelectual",
        content: [
            "Todos los derechos de propiedad intelectual sobre la Aplicación, incluyendo el código fuente, la interfaz de usuario, las funciones y los modelos de IA, son propiedad de Lorenzo Cremonese o de los respectivos propietarios. El uso de la Aplicación no otorga al usuario ningún derecho sobre los derechos de propiedad intelectual de la misma.",
        ],
    },
    {
        title: "Confidencialidad y Privacidad",
        content: [
            "Nos comprometemos a proteger la privacidad de los usuarios. Cualquier dato personal que se nos proporcione será manejado de acuerdo con nuestra Política de Privacidad. Sin embargo, debes tener en cuenta que los archivos que subas a la Aplicación pueden ser procesados para fines de análisis, y esos datos serán almacenados en nuestras bases de datos.",
        ],
    },
    {
        title: "Limitación de Responsabilidad",
        content: [
            "La Aplicación se proporciona 'tal cual', sin garantías de ningún tipo, ya sea explícitas o implícitas. No garantizamos que la Aplicación estará libre de errores o interrupciones, y no asumimos responsabilidad alguna por daños directos, indirectos, especiales, incidentales o consecuentes que puedan surgir del uso de la Aplicación.",
        ],
    },
    {
        title: "Modificaciones de los Términos",
        content: [
            "Nos reservamos el derecho de modificar estos Términos en cualquier momento. Cualquier cambio será publicado en esta página, y la fecha de la última actualización será reflejada en la parte inferior de este documento. Es tu responsabilidad revisar periódicamente estos Términos para estar informado sobre cualquier cambio.",
        ],
    },
    {
        title: "Terminación",
        content: [
            "Nos reservamos el derecho de suspender o terminar el acceso a la Aplicación, en su totalidad o en parte, en cualquier momento y por cualquier motivo, incluyendo, entre otros, la violación de estos Términos. Tras la terminación, todas las licencias otorgadas a través de la Aplicación se extinguirán inmediatamente.",
        ],
    },
    {
        title: "Indemnización",
        content: [
            "El usuario se compromete a indemnizar y eximir de responsabilidad a Lorenzo Cremonese y a sus empleados, directores, agentes y representantes, frente a cualquier reclamo, daño, pérdida, responsabilidad, gasto o costos (incluyendo honorarios legales) derivados del uso de la Aplicación, la violación de estos Términos, o el incumplimiento de cualquier ley aplicable.",
        ],
    },
    {
        title: "Ley Aplicable y Jurisdicción",
        content: [
            "Estos Términos se regirán por las leyes de España, sin tener en cuenta sus principios sobre conflictos de leyes. Cualquier disputa relacionada con estos Términos será resuelta exclusivamente en los tribunales de España, y el usuario acepta someterse a la jurisdicción de dichos tribunales.",
        ],
    },
    {
        title: "Contacto",
        content: [
            "Si tienes alguna pregunta sobre estos Términos, puedes ponerte en contacto con nosotros a través de lorenzo.cremonese10@gmail.com .",
        ],
    },
];

export const MODELS = {
    local: "deepseek-r1",
    gpt: "gtp-4o-mini",
    claude: "claude-3.7-sonnet",
    gemini: "gemini-2.0-flash",
};

export const HOME_CARDS = [
    {
        to: "/documents",
        icon: "bi-file-earmark-text",
        title: "Documentos",
        text: "Sube tus documentos PDF o de texto plano para que el modelo pueda procesarlos.",
        colClasses: "col-12 col-md-6",
    },
    {
        to: "/chat",
        icon: "bi-chat",
        title: "Chat",
        text: "Conversa con nuestro modelo para preguntarle todo lo que quieras sobre tus documentos.",
        colClasses: "col-12 col-md-6",
    },
    {
        to: "/history",
        icon: "bi-clock-history",
        title: "Historial",
        text: "Consulta los mensajes enviados y recibidos cuando quieras.",
        colClasses: "col-12 col-md-7",
    },
    {
        to: "/stats",
        icon: "bi-bar-chart-line",
        title: "Estadísticas",
        text: "Hazte una idea con las estadísticas.",
        colClasses: "col-12 col-md-5",
    },
];

export const MENU_ITEMS = [
    { path: "/chat", label: "Chat", icon: "bi bi-chat" },
    {
      path: "/documents",
      label: "Documentos",
      icon: "bi bi-file-earmark-text",
    },
    { path: "/history", label: "Historial", icon: "bi bi-clock-history" },
    { path: "/stats", label: "Estadísticas", icon: "bi bi-bar-chart-line" },
  ];