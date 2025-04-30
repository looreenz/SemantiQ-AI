<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a SemantiQ AI</title>
    <!-- Incluir Bootstrap desde CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

        :root {
            --color-primary: #222;
            --color-secondary: #8b5cf6;
            --color-message: #333;
            --color-accent: #27ccee;
        }

        * {
            color: white;
            font-family: "Poppins", sans-serif;
            box-sizing: border-box;
        }

        body {
            background-color: #222;
        }

        .text-purple {
            color: var(--color-secondary) !important;
        }

        .text-cyan {
            color: var(--color-accent) !important;
        }

        .bg-message {
            background-color: var(--color-message) !important;
        }
    </style>
</head>

<body>
    <section class="hero-section">
        <div class="container text-center">
            <h1 class="text-purple">Bienvenido a SemantiQ AI</h1>
            <p class="lead">Tu plataforma inteligente para el análisis de documentos utilizando IA.</p>
        </div>
    </section>

    <div class="container my-5">
        <h2 class="mb-4 text-purple">Endpoints Útiles de la API</h2>
        <p>A continuación, se listan los endpoints de la API disponibles. Puedes interactuar con ellos para gestionar
            tus documentos, consultar la información y realizar operaciones mediante IA.</p>

        <ul class="list-unstyled api-list">
            @foreach ($routes as $route)
                <li class="d-flex justify-content-between align-items-center bg-message p-3 mb-2 rounded">
                    <div>
                        <strong><span class="text-cyan">{{ $route['method'] }}</span> {{ $route['endpoint'] }}</strong>
                        <p class="m-0">{{ $route['description'] }}</p>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>

    <footer class="py-3 text-center">
        <p class="text-purple">&copy; {{ date('Y') }} SemantiQ AI. Todos los derechos reservados.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>