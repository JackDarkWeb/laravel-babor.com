<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::pattern('lang', 'fr|en');

Route::prefix('fr')->group(function (){

    App::setLocale(request()->segment(1));

    Route::get('/', function () {


        $months  = [1 => "Janvier", "Février",  "Mars",  "Avril", "Mai", "Juin",  "Juillet", "Août",  "Septembre", "Octobre", "Novembre", "Décembre"];
        return view('fr.home.welcome', ['months' => $months]);
    })->name('home');

    Route::group(['prefix' => 'users'], function (){

        Route::get('register', function (){


            return view('fr.user.register', [


                'remember' => Session()->get('remember'),
                'email'    => Session()->get('email'),
                'password' => Session()->get('password'),
                'months' => $months  = [1 => "Janvier", "Février",  "Mars",  "Avril", "Mai", "Juin",  "Juillet", "Août",  "Septembre", "Octobre", "Novembre", "Décembre"]
            ]);
        })->name('register');
    });
});








Route::group(['prefix' => 'tests'], function (){

    Route::get('form', function (){

        return view('tests.test');
    });

    Route::get('product/{id?}', function ($id = null){

        function get_product(int $id = null){
            $products = [
                ['tomate', 'piment', 'riz'],
                ['telephone', 'tv', 'appareil']
            ];
            if($id === null)
                return $products;
            else
                return $products[$id];
        }
        $p = get_product($id);
        return response()->json($p);
    });

});









