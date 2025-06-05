<?php

namespace App\Controller\Upgrade;

use App\Repository\UpgradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DeleteUpgradeController extends AbstractController
{
    #[Route('/api/upgrades/{id}', name: 'upgrade_delete', methods: ['DELETE'])]
    public function __invoke(int $id, UpgradeRepository $upgradeRepository, EntityManagerInterface $em): JsonResponse
    {
        $upgrade = $upgradeRepository->find($id);
        if (!$upgrade) {
            return new JsonResponse(['error' => 'Upgrade not found'], 404);
        }
        $em->remove($upgrade);
        $em->flush();
        return new JsonResponse(['status' => 'deleted']);
    }
}
