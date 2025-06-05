<?php

namespace App\Controller\BuildUpgrade;

use App\Repository\BuildRepository;
use App\Repository\BuildUpgradeRepository;
use App\Repository\UpgradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UpdateBuildUpgradeController extends AbstractController
{
    #[Route('/api/build-upgrades/{id}', name: 'buildupgrade_update', methods: ['PUT'])]
    public function __invoke(int $id, Request $request, BuildUpgradeRepository $repository, BuildRepository $buildRepository, UpgradeRepository $upgradeRepository, EntityManagerInterface $em): JsonResponse
    {
        $bu = $repository->find($id);
        if (!$bu) {
            return new JsonResponse(['error' => 'Record not found'], 404);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['build'])) {
            $build = $buildRepository->find($data['build']);
            if ($build) {
                $bu->setBuild($build);
            }
        }
        if (isset($data['upgrade'])) {
            $upgrade = $upgradeRepository->find($data['upgrade']);
            if ($upgrade) {
                $bu->setUpgrade($upgrade);
            }
        }
        if (isset($data['slot'])) {
            $bu->setSlot((int) $data['slot']);
        }
        $em->flush();
        return new JsonResponse(['status' => 'ok']);
    }
}
