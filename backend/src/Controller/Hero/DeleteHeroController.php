<?php

namespace App\Controller\Hero;

use App\Repository\HeroRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DeleteHeroController extends AbstractController
{
    #[Route('/api/heroes/{id}', name: 'hero_delete', methods: ['DELETE'])]
    public function __invoke(int $id, HeroRepository $heroRepository, EntityManagerInterface $em): JsonResponse
    {
        $hero = $heroRepository->find($id);
        if (!$hero) {
            return new JsonResponse(['error' => 'Hero not found'], 404);
        }
        $em->remove($hero);
        $em->flush();
        return new JsonResponse(['status' => 'deleted']);
    }
}
