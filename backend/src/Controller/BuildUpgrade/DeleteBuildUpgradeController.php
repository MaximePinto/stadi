<?php

namespace App\Controller\BuildUpgrade;

use App\Repository\BuildUpgradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DeleteBuildUpgradeController extends AbstractController
{
    #[Route('/api/build-upgrades/{id}', name: 'buildupgrade_delete', methods: ['DELETE'])]
    public function __invoke(int $id, BuildUpgradeRepository $repository, EntityManagerInterface $em): JsonResponse
    {
        $bu = $repository->find($id);
        if (!$bu) {
            return new JsonResponse(['error' => 'Record not found'], 404);
        }
        $em->remove($bu);
        $em->flush();
        return new JsonResponse(['status' => 'deleted']);
    }
}
