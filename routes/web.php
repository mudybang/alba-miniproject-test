<?php

use Illuminate\Support\Facades\Route;

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

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::view('/dashboard/{path?}', 'dashboard.app')
    ->where('path', '.*');

Route::get('/', [\App\Http\Controllers\BlogController::class, 'index']);
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'detail']);

Route::resource('orders', \App\Http\Controllers\OrderController::class)->only(['index', 'show']);
Route::post('payments/midtrans-notification', [\App\Http\Controllers\PaymentCallbackController::class, 'receive']);
