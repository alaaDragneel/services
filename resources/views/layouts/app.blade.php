<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- Custome meta For laravel Requests --}}
    <meta id="_token" value="{{ csrf_token() }}">
    {{-- Custome meta laravel Requests --}}
    <title>Services Site</title>

    <!-- Styles -->
    {{ Html::style('css/style.css') }}

</head>
<body id="app-layout">

    @yield('content')

    <!-- JavaScripts -->
    {{ Html::script('js/main.js') }}
    {{ Html::script('js/app.js') }}
@if (Session::has('success'))

    <script type="text/javascript">
    var msg = '{{ Session::get('success') }}';
    alertify.success(msg);
    </script>
@endif
@if (Session::has('error'))

    <script type="text/javascript">
    var msg = '{{ Session::get('error') }}';
    alertify.error(msg);
    </script>
@endif
@if (count($errors) > 0)
    <script type="text/javascript">
    @foreach ($errors->all() as $error)
    alertify.error('{{ $error }}');
    @endforeach
    </script>
@endif

</body>
</html>
