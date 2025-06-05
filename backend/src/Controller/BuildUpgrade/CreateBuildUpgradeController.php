<?php

namespace App\Controller\BuildUpgrade;

use App\Entity\BuildUpgrade;
use App\Repository\BuildRepository;
use App\Repository\UpgradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CreateBuildUpgradeController extends AbstractController
{
    #[Route('/api/build-upgrades', name: 'buildupgrade_create', methods: ['POST'])]
    public function __invoke(Request $request, BuildRepository $buildRepository, UpgradeRepository $upgradeRepository, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $build = $buildRepository->find($data['build'] ?? 0);
        $upgrade = $upgradeRepository->find($data['upgrade'] ?? 0);
        if (!$build || !$upgrade) {
            return new JsonResponse(['error' => 'Invalid payload'], 400);
        }
        $bu = new BuildUpgrade();
        $bu->setBuild($build)
            ->setUpgrade($upgrade)
            ->setSlot($data['slot'] ?? 0);
        $em->persist($bu);
        $em->flush();
        return new JsonResponse(['id' => $bu->getId()], 201);
    }
}
