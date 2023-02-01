<?php
namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller{
    public function index(){
        $data=Post::get();
        $data_=[];
        foreach($data as $row){
            if($row->categories!=''){
                $categories=json_decode($row->categories,true);
                $categories_="";
                foreach($categories as $id){
                    $categories_.=Category::find($id)->name.", ";
                }
                $row['categories_']=rtrim($categories_, ',');
            }
            if($row->tags!=''){
                $tags=json_decode($row->tags,true);
                $tags_="";
                foreach($tags as $id){
                    $tags_.=Tag::find($id)->name.", ";
                }
                $row['tags_']=rtrim($tags_, ' ,');
            }
            $data_[]=$row;
        }

        //$results=array_merge($result,array('rows'=>BusinessResource::collection($data_),'sql'=>$data->toSql()));
		return response()->json($data_);
    }

    public function store(Request $request){
        $raw=Post::create([
            'title' => $request->title,
            'slug' => \Str::slug($request->title),
            'content' => $request->content,
            'categories' => $request->categories,
            'tags' => $request->tags,
        ]);
        return response()->json([
            'message' => 'Create Success',
            'raw' => $raw,
        ]);
    }

    public function update(Request $request, Post $post){
        $post->title = $request->title;
        $post->slug = \Str::slug($request->title);
        $post->content = $request->content;
        $post->categories = $request->categories;
        $post->tags = $request->tags;
        $post->save();
        return response()->json([
            'message' => 'Update Success',
            'raw' => $post,
        ]);
    }

    public function destroy(Post $post){
        $post->delete();
        return response()->json([
            'message' => 'Delete Success',
        ]);
    }
}
