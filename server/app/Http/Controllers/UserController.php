<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::query();

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $users->orderBy($request->sort_by, $request->sort_order);
        }

        return response()->json($users->get());
    }

    public function store(Request $request)
    {
        $user = User::create($request->all());

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'firstName' => 'string|max:255',
            'lastName' => 'string|max:255',
            'birthDate' => 'date',
            'email' => 'string|email|max:255|unique:users,email,' . $id,
            'password' => 'string|min:3',
        ]);

        $user = User::findOrFail($id);

        if ($request->has('firstName')) {
            $user->firstName = $request->firstName;
        }
        if ($request->has('lastName')) {
            $user->lastName = $request->lastName;
        }
        if ($request->has('birthDate')) {
            $user->birthDate = $request->birthDate;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json($user);
    }


    public function show($id)
    {
        $user = User::where('id', $id)->first();
        return $user;
    }
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
