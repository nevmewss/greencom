<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageApiResource;
use App\Models\Locale;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $this->ensureRequestedLocaleExists($request);

        return PageApiResource::collection(
            Page::query()
                ->with(['translations.locale'])
                ->where('is_published', true)
                ->orderBy('id')
                ->get(),
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $slug): PageApiResource
    {
        $this->ensureRequestedLocaleExists($request);

        $page = Page::query()
            ->with(['translations.locale'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return new PageApiResource($page);
    }

    private function ensureRequestedLocaleExists(Request $request): void
    {
        $code = $request->query('locale');

        if ($code === null) {
            return;
        }

        abort_unless(
            Locale::query()->where('code', $code)->where('is_active', true)->exists(),
            404,
            'Locale not found.',
        );
    }
}
