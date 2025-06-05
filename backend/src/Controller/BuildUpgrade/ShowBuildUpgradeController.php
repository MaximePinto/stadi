<?php

namespace App\Controller\BuildUpgrade;

use App\Repository\BuildUpgradeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ShowBuildUpgradeController extends AbstractController
{
    #[Route('/api/build-upgrades/{id}', name: 'buildupgrade_show', methods: ['GET'])]
    public function __invoke(int $id, BuildUpgradeRepository $repository): JsonResponse
    {
        $record = $repository->find($id);
        if (!$record) {
            return new JsonResponse(['error' => 'Record not found'], 404);
        }
        return new JsonResponse([
            'id' => $record->getId(),
            'build' => $record->getBuild()?->getId(),
            'upgrade' => $record->getUpgrade()?->getId(),
            'slot' => $record->getSlot(),
        ]);
    }
}
