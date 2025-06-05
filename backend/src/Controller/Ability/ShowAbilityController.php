<?php

namespace App\Controller\Ability;

use App\Repository\AbilityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ShowAbilityController extends AbstractController
{
    #[Route('/api/abilities/{id}', name: 'ability_show', methods: ['GET'])]
    public function __invoke(int $id, AbilityRepository $abilityRepository): JsonResponse
    {
        $ability = $abilityRepository->find($id);
        if (!$ability) {
            return new JsonResponse(['error' => 'Ability not found'], 404);
        }
        return new JsonResponse([
            'id' => $ability->getId(),
            'hero' => $ability->getHero()?->getId(),
            'name' => $ability->getName(),
            'description' => $ability->getDescription(),
            'cooldown' => $ability->getCooldown(),
            'iconUrl' => $ability->getIconUrl(),
        ]);
    }
}
