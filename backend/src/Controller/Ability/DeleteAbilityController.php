<?php

namespace App\Controller\Ability;

use App\Repository\AbilityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DeleteAbilityController extends AbstractController
{
    #[Route('/api/abilities/{id}', name: 'ability_delete', methods: ['DELETE'])]
    public function __invoke(int $id, AbilityRepository $abilityRepository, EntityManagerInterface $em): JsonResponse
    {
        $ability = $abilityRepository->find($id);
        if (!$ability) {
            return new JsonResponse(['error' => 'Ability not found'], 404);
        }
        $em->remove($ability);
        $em->flush();
        return new JsonResponse(['status' => 'deleted']);
    }
}
