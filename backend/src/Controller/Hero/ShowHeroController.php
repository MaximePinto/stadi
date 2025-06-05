<?php

namespace App\Controller\Hero;

use App\Repository\HeroRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ShowHeroController extends AbstractController
{
    #[Route('/api/heroes/{id}', name: 'hero_show', methods: ['GET'])]
    public function __invoke(int $id, HeroRepository $heroRepository): JsonResponse
    {
        $hero = $heroRepository->find($id);
        if (!$hero) {
            return new JsonResponse(['error' => 'Hero not found'], 404);
        }
        return new JsonResponse([
            'id' => $hero->getId(),
            'name' => $hero->getName(),
            'role' => $hero->getRole(),
            'description' => $hero->getDescription(),
            'imageUrl' => $hero->getImageUrl(),
        ]);
    }
}
