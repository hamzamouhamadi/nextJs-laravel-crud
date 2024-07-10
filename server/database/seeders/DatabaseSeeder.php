<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // DB::table('users')->insert([
        //     'firstName' => 'hamza',
        //     'lastName' => 'mouhamadi',
        //     'email' => 'hamza@example.com',
        //     'password' => Hash::make('123'),
        // ]);
        DB::table('users')->insert([
            'firstName' => Str::random(10),
            'lastName' => Str::random(10),
            'birthDate' => Date::now(),
            'email' => 'hamza@gmail.com',
            'password' => Hash::make('123'),
        ]);
    }
}
