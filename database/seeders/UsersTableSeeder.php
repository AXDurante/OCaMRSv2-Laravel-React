<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'firstName' => 'Maria',
                'lastName' => 'Santos',
                'email' => 'maria.santos@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123456',
                'phoneNumber' => '09123456789',
                'college' => 'Engineering',
                'labLoc' => 'Engineering Building Room 405',
                'position' => 'Professor',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Juan',
                'lastName' => 'Dela Cruz',
                'email' => 'juan.delacruz@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123457',
                'phoneNumber' => '09123456790',
                'college' => 'Science',
                'labLoc' => 'Main Building Room 201',
                'position' => 'Laboratory Supervisor',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Ana',
                'lastName' => 'Reyes',
                'email' => 'ana.reyes@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123458',
                'phoneNumber' => '09123456791',
                'college' => 'Engineering',
                'labLoc' => 'Engineering Building Room 302',
                'position' => 'Research Assistant',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Miguel',
                'lastName' => 'Garcia',
                'email' => 'miguel.garcia@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123459',
                'phoneNumber' => '09123456792',
                'college' => 'Science',
                'labLoc' => 'Research Center Room 101',
                'position' => 'Associate Professor',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Sofia',
                'lastName' => 'Mendoza',
                'email' => 'sofia.mendoza@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123460',
                'phoneNumber' => '09123456793',
                'college' => 'Engineering',
                'labLoc' => 'Engineering Building Room 205',
                'position' => 'Laboratory Technician',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Luis',
                'lastName' => 'Bautista',
                'email' => 'luis.bautista@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123461',
                'phoneNumber' => '09123456794',
                'college' => 'Science',
                'labLoc' => 'Main Building Room 301',
                'position' => 'Professor',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Isabella',
                'lastName' => 'Cruz',
                'email' => 'isabella.cruz@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123462',
                'phoneNumber' => '09123456795',
                'college' => 'Engineering',
                'labLoc' => 'Engineering Building Room 401',
                'position' => 'Research Coordinator',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Gabriel',
                'lastName' => 'Torres',
                'email' => 'gabriel.torres@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123463',
                'phoneNumber' => '09123456796',
                'college' => 'Science',
                'labLoc' => 'Research Center Room 202',
                'position' => 'Laboratory Manager',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Carmen',
                'lastName' => 'Villanueva',
                'email' => 'carmen.villanueva@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123464',
                'phoneNumber' => '09123456797',
                'college' => 'Engineering',
                'labLoc' => 'Engineering Building Room 303',
                'position' => 'Assistant Professor',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Rafael',
                'lastName' => 'Ramos',
                'email' => 'rafael.ramos@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2020123465',
                'phoneNumber' => '09123456798',
                'college' => 'Science',
                'labLoc' => 'Main Building Room 401',
                'position' => 'Research Assistant',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}