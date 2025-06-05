<?php

namespace App\Controller\Ability;

use App\Repository\AbilityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ListAbilityController extends AbstractController
{
    #[Route('/api/abilities', name: 'ability_list', methods: ['GET'])]
    public function __invoke(AbilityRepository $abilityRepository): JsonResponse
    {
        $abilities = $abilityRepository->findAll();
        $data = [];
        foreach ($abilities as $ability) {
            $data[] = [
                'id' => $ability->getId(),
                'hero' => $ability->getHero()?->getId(),
                'name' => $ability->getName(),
            ];
        }
        return new JsonResponse($data);
    }
}
