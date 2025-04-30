<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a SemantiQ AI</title>
    <!-- Incluir Bootstrap desde CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
</head>

<body>

    <!-- Sección de bienvenida -->
    <section class="hero-section">
        <div class="container text-center">
            <h1 class="text-primary">Bienvenido a SemantiQ AI</h1>
            <p class="lead">Tu plataforma inteligente para el análisis de documentos utilizando IA.</p>
        </div>
    </section>

    <div class="container my-5">
        <h2 class="mb-4">Endpoints Útiles de la API</h2>
        <p>A continuación, se listan los endpoints de la API disponibles. Puedes interactuar con ellos para gestionar
            tus documentos, consultar la información y realizar operaciones mediante IA.</p>

        <!-- Lista de Endpoints -->
        <ul class="list-unstyled api-list">
            @foreach ($routes as $route)
                <li class="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>{{ $route['method'] }} {{ $route['endpoint'] }}</strong>
                        <p>{{ $route['description'] }}</p>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>

    <footer class="bg-dark text-white py-3 text-center">
        <p>&copy; {{ date('Y') }} SemantiQ AI. Todos los derechos reservados.</p>
    </footer>

    <!-- Incluir Bootstrap JS (Opcional para interactividad) -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
</body>

</html>