<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Styles -->
    {{ Html::style('admin/css/style.css') }}

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<body>

@include('admin.includes.navbar')

@yield('content')

<footer>
    <div class="container">

        <div class="copy text-center">
            Copyright @php echo date('Y') @endphp <a href='index.php'>alaaDragneel</a>
        </div>

    </div>
</footer>
<!-- JavaScripts -->
{{ Html::script('admin/js/main.js') }}
<script type="text/javascript">
// return the root link
function urlHome(root = 1)
{
    if(root == 1) {
        return '{{ Request::root() }}';
    } else {
        return '{{ asset('admin/images/card/card.jpg') }}';
    }
}
</script>
@if (Session::has('success'))

    <script type="text/javascript">
        var msg = '{{ Session::get('success') }}';
        alertify.success(msg);
    </script>
@endif
</body>
</html>
