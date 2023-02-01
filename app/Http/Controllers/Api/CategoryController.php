<?php
namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller{
    public function index(){
        return Category::all();
    }

    public function store(Request $request){
        $raw=Category::create([
            'name' => $request->name,
            'slug' => \Str::slug($request->name),
        ]);
        return response()->json([
            'message' => 'Create Success',
            'raw' => $raw,
        ]);
    }

    public function update(Request $request, Category $category){
        $category->name = $request->name;
        $category->slug = \Str::slug($request->name);
        $category->save();
        return response()->json([
            'message' => 'Update Success',
            'raw' => $category,
        ]);
    }

    public function destroy(Category $category){
        $category->delete();
        return response()->json([
            'message' => 'Delete Success',
        ]);
    }
}
