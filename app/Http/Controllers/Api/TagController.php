<?php
namespace App\Http\Controllers\Api;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TagController extends Controller{
    public function index(){
        return Tag::all();
    }

    public function store(Request $request){
        $raw=Tag::create([
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
        ]);
        return response()->json([
            'message' => 'Create Success',
            'raw' => $raw,
        ]);
    }

    public function update(Request $request, Tag $tag){
        $tag->name = $request->name;
        $tag->slug = \Str::slug($request->name);
        $tag->save();
        return response()->json([
            'message' => 'Update Success',
            'raw' => $tag,
        ]);
    }

    public function destroy(Tag $tag){
        $tag->delete();
        return response()->json([
            'message' => 'Delete Success',
        ]);
    }
}
