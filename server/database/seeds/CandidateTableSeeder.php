<?php

use Illuminate\Database\Seeder;

class CandidateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      //   DB::table('candidates')->insert(
      //   [
      //       'name' => 'Wlademyr Mendes',
      //       'email' => 'wlademyr.mendes@gmail.com',
      //       'mobileNumber' => '021980227936'
      //   ],
      //   [
      //       'name' => 'Mendes Junior',
      //       'email' => 'wlademyr@gmail.com',
      //       'mobileNumber' => '0219802279369'
      //   ]
      //
      // );

      factory(App\Candidate::class, 50)->create();
    }
}
