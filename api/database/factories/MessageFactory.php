<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;


class MessageFactory extends Factory
{
    
    public function definition()
    {
        $name = $this->faker->unique()->sentence();
        return [
            
            'mensaje'=>$this->faker->text(200),

            'user_id'=>User::all()->random()->id,

        ];
    }
}
