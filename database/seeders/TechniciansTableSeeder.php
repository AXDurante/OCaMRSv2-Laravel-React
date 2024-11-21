<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Technician;
use Illuminate\Support\Facades\Hash;

class TechniciansTableSeeder extends Seeder
{
    public function run()
    {
        $technicians = [
            [
                'firstName' => 'Marco',
                'lastName' => 'Rodriguez',
                'email' => 'marco.rodriguez@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000001',
                'phoneNumber' => '09187654321',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Diana',
                'lastName' => 'Fernandez',
                'email' => 'diana.fernandez@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000002',
                'phoneNumber' => '09187654322',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Antonio',
                'lastName' => 'Lopez',
                'email' => 'antonio.lopez@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000003',
                'phoneNumber' => '09187654323',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Elena',
                'lastName' => 'Santos',
                'email' => 'elena.santos@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000004',
                'phoneNumber' => '09187654324',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Ricardo',
                'lastName' => 'Reyes',
                'email' => 'ricardo.reyes@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000005',
                'phoneNumber' => '09187654325',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Patricia',
                'lastName' => 'Cruz',
                'email' => 'patricia.cruz@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000006',
                'phoneNumber' => '09187654326',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Manuel',
                'lastName' => 'Garcia',
                'email' => 'manuel.garcia@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000007',
                'phoneNumber' => '09187654327',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Victoria',
                'lastName' => 'Torres',
                'email' => 'victoria.torres@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000008',
                'phoneNumber' => '09187654328',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Francisco',
                'lastName' => 'Mendoza',
                'email' => 'francisco.mendoza@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000009',
                'phoneNumber' => '09187654329',
                'email_verified_at' => now(),
            ],
            [
                'firstName' => 'Beatriz',
                'lastName' => 'Ramos',
                'email' => 'beatriz.ramos@ust.edu.ph',
                'password' => Hash::make('password123'),
                'employeeID' => '2021000010',
                'phoneNumber' => '09187654330',
                'email_verified_at' => now(),
            ],
        ];

        foreach ($technicians as $technician) {
            Technician::create($technician);
        }
    }
}