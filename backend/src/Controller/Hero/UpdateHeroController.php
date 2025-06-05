<?php

namespace App\Controller\Hero;

use App\Repository\HeroRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UpdateHeroController extends AbstractController
{
    #[Route('/api/heroes/{id}', name: 'hero_update', methods: ['PUT'])]
    public function __invoke(int $id, Request $request, HeroRepository $heroRepository, EntityManagerInterface $em): JsonResponse
    {
        $hero = $heroRepository->find($id);
        if (!$hero) {
            return new JsonResponse(['error' => 'Hero not found'], 404);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['name'])) {
            $hero->setName($data['name']);
        }
        if (isset($data['role'])) {
            $hero->setRole($data['role']);
        }
        if (isset($data['description'])) {
            $hero->setDescription($data['description']);
        }
        if (array_key_exists('imageUrl', $data)) {
            $hero->setImageUrl($data['imageUrl']);
        }
        $em->flush();
        return new JsonResponse(['status' => 'ok']);
    }
}
