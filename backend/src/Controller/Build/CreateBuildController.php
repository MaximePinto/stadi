<?php

namespace App\Controller\Build;

use App\Entity\Build;
use App\Entity\BuildUpgrade;
use App\Repository\HeroRepository;
use App\Repository\UpgradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CreateBuildController extends AbstractController
{
    #[Route('/api/builds', name: 'build_create', methods: ['POST'])]
    public function __invoke(Request $request, HeroRepository $heroRepository, UpgradeRepository $upgradeRepository, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $hero = $heroRepository->find($data['hero'] ?? 0);
        if (!$hero) {
            return new JsonResponse(['error' => 'Hero not found'], 404);
        }
        $build = new Build();
        $build->setUser($this->getUser())
            ->setHero($hero)
            ->setName($data['name'] ?? '')
            ->setDescription($data['description'] ?? '')
            ->setIsPublic($data['isPublic'] ?? false);
        $em->persist($build);
        if (!empty($data['items'])) {
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
        $em->flush();
        return new JsonResponse(['id' => $build->getId()], 201);
    }
}
