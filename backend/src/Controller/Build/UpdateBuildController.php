<?php

namespace App\Controller\Build;

use App\Repository\BuildRepository;
use App\Repository\HeroRepository;
use App\Repository\UpgradeRepository;
use App\Entity\BuildUpgrade;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UpdateBuildController extends AbstractController
{
    #[Route('/api/builds/{id}', name: 'build_update', methods: ['PUT'])]
    public function __invoke(int $id, Request $request, BuildRepository $buildRepository, HeroRepository $heroRepository, UpgradeRepository $upgradeRepository, EntityManagerInterface $em): JsonResponse
    {
        $build = $buildRepository->find($id);
        if (!$build) {
            return new JsonResponse(['error' => 'Build not found'], 404);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['hero'])) {
            $hero = $heroRepository->find($data['hero']);
            if ($hero) {
                $build->setHero($hero);
            }
        }
        if (isset($data['name'])) {
            $build->setName($data['name']);
        }
        if (isset($data['description'])) {
            $build->setDescription($data['description']);
        }
        if (isset($data['isPublic'])) {
            $build->setIsPublic($data['isPublic']);
        }
        if (isset($data['items'])) {
            foreach ($build->getBuildUpgrades() as $existing) {
                $em->remove($existing);
            }
            foreach ($data['items'] as $itemData) {
                $upgrade = $upgradeRepository->find($itemData['upgrade']);
                if ($upgrade) {
                    $bu = new BuildUpgrade();
                    $bu->setBuild($build)
                        ->setUpgrade($upgrade)
                        ->setSlot($itemData['slot'] ?? 0);
                    $em->persist($bu);
                }
            }
        }
        $build->setUpdatedAt(new \DateTimeImmutable());
        $em->flush();
        return new JsonResponse(['status' => 'ok']);
    }
}
