@extends('blog.layouts.app')
@section('content')
    <?php
    foreach($posts as $post){
        echo '<div class="card text-bg-light p-2 mb-2">
            <h1>'.$post->title.'</h1>
            <p>
                '.substr($post->content,0,200).'...
            </p>
            <p class="lead">
            <a href="/blog/'.$post->slug.'" class="btn btn-sm btn-primary fw-bold border-white">Read More</a>
            </p>
        </div>';
    }
    ?>

@endsection
