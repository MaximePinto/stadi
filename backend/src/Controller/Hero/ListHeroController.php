<?php

namespace App\Controller\Hero;

use App\Repository\HeroRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ListHeroController extends AbstractController
{
    #[Route('/api/heroes', name: 'hero_list', methods: ['GET'])]
    public function __invoke(HeroRepository $heroRepository): JsonResponse
    {
        $heroes = $heroRepository->findAll();
        $data = [];
        foreach ($heroes as $hero) {
            $data[] = [
                'id' => $hero->getId(),
                'name' => $hero->getName(),
                'role' => $hero->getRole(),
            ];
        }
        return new JsonResponse($data);
    }
}
