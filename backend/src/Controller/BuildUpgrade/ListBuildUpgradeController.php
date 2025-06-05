<?php

namespace App\Controller\BuildUpgrade;

use App\Repository\BuildUpgradeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ListBuildUpgradeController extends AbstractController
{
    #[Route('/api/build-upgrades', name: 'buildupgrade_list', methods: ['GET'])]
    public function __invoke(BuildUpgradeRepository $repository): JsonResponse
    {
        $records = $repository->findAll();
        $data = [];
        foreach ($records as $record) {
            $data[] = [
                'id' => $record->getId(),
                'build' => $record->getBuild()?->getId(),
                'upgrade' => $record->getUpgrade()?->getId(),
                'slot' => $record->getSlot(),
            ];
        }
        return new JsonResponse($data);
    }
}
