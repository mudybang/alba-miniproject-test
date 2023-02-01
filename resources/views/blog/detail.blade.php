@extends('blog.layouts.app')
@section('content')
    <div class="row">
        <div class="col-md-8">
            <div class="card text-bg-light p-4">
                <h1><?=$row->title?></h1>
                <p class="text-start"><?php echo $row->content?></p>
                <p><?=$row->created_at?></p>
            </div>
        </div>
        <div class="col-md-4">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb w-100">
                <li class="breadcrumb-item" aria-current="page">
                    <a class="text-light" href="/">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    <?=$row->title?>
                </li>
            </ol>
        </nav>
            <?php
            foreach($posts as $post){
                echo '<div class="card text-bg-light p-2 mb-2">
                    <a href="/blog/'.$post->slug.'">'.$post->title.'</a>
                </div>';
            }
            ?>
        </div>
    </div>
@endsection
