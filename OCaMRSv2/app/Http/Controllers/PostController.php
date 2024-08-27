<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Delay
        sleep(1);

        // To include pagination to the data
        $posts = Post::latest()->paginate(5);
        return inertia('Post', ['posts' => $posts]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    $fields = $request->validate([
        'body' => ['required']
    ]);

        Post::create($fields);

        return redirect('/post');
    }

    // Display the specified resource or for posting a specific page
    public function show(Post $post)
    {
        // Post is a prop
        return inertia('Show', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect('/post');
        
    }
}
