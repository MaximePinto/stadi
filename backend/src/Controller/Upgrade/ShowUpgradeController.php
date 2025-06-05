<?php

namespace App\Controller\Upgrade;

use App\Repository\UpgradeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ShowUpgradeController extends AbstractController
{
    #[Route('/api/upgrades/{id}', name: 'upgrade_show', methods: ['GET'])]
    public function __invoke(int $id, UpgradeRepository $upgradeRepository): JsonResponse
    {
        $upgrade = $upgradeRepository->find($id);
        if (!$upgrade) {
            return new JsonResponse(['error' => 'Upgrade not found'], 404);
        }
        return new JsonResponse([
            'id' => $upgrade->getId(),
            'ability' => $upgrade->getAbility()?->getId(),
            'name' => $upgrade->getName(),
            'description' => $upgrade->getDescription(),
            'cost' => $upgrade->getCost(),
            'effect' => $upgrade->getEffect(),
        ]);
    }
}
