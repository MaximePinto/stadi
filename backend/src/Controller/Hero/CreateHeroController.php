<?php

namespace App\Controller\Hero;

use App\Entity\Hero;
use App\Repository\HeroRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CreateHeroController extends AbstractController
{
    #[Route('/api/heroes', name: 'hero_create', methods: ['POST'])]
    public function __invoke(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $hero = new Hero();
        $hero->setName($data['name'] ?? '')
            ->setRole($data['role'] ?? '')
            ->setDescription($data['description'] ?? '')
            ->setImageUrl($data['imageUrl'] ?? null);
        $em->persist($hero);
        $em->flush();
        return new JsonResponse(['id' => $hero->getId()], 201);
    }
}
