<?php

use App\Http\Controllers\Api\LocaleController;
use App\Http\Controllers\Api\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/locales', [LocaleController::class, 'index']);
Route::get('/pages', [PageController::class, 'index']);
Route::get('/pages/{slug}', [PageController::class, 'show']);
