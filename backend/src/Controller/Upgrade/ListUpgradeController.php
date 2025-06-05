<?php

namespace App\Controller\Upgrade;

use App\Repository\UpgradeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ListUpgradeController extends AbstractController
{
    #[Route('/api/upgrades', name: 'upgrade_list', methods: ['GET'])]
    public function __invoke(UpgradeRepository $upgradeRepository): JsonResponse
    {
        $upgrades = $upgradeRepository->findAll();
        $data = [];
        foreach ($upgrades as $upgrade) {
            $data[] = [
                'id' => $upgrade->getId(),
                'ability' => $upgrade->getAbility()?->getId(),
                'name' => $upgrade->getName(),
            ];
        }
        return new JsonResponse($data);
    }
}
