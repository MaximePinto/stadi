<?php

namespace App\Controller\Ability;

use App\Entity\Ability;
use App\Repository\HeroRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CreateAbilityController extends AbstractController
{
    #[Route('/api/abilities', name: 'ability_create', methods: ['POST'])]
    public function __invoke(Request $request, HeroRepository $heroRepository, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $hero = $heroRepository->find($data['hero'] ?? 0);
        if (!$hero) {
            return new JsonResponse(['error' => 'Hero not found'], 404);
        }
        $ability = new Ability();
        $ability->setHero($hero)
            ->setName($data['name'] ?? '')
            ->setDescription($data['description'] ?? '')
            ->setCooldown($data['cooldown'] ?? null)
            ->setIconUrl($data['iconUrl'] ?? null);
        $em->persist($ability);
        $em->flush();
        return new JsonResponse(['id' => $ability->getId()], 201);
    }
}
