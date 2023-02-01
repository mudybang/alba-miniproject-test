<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

class BlogController extends Controller{
    public function index(){
        return view('blog.home', ['posts' => Post::all()]);
    }
    public function detail($slug){
        return view('blog.detail', [
            'row'=>Post::where('slug',$slug)->first(),
            'posts' => Post::all()
        ]);
    }
}
