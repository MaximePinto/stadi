<?php

namespace App\Controller\Build;

use App\Repository\BuildRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ShowBuildController extends AbstractController
{
    #[Route('/api/builds/{id}', name: 'build_show', methods: ['GET'])]
    public function __invoke(int $id, BuildRepository $buildRepository): JsonResponse
    {
        $build = $buildRepository->find($id);
        if (!$build) {
            return new JsonResponse(['error' => 'Build not found'], 404);
        }
        $items = [];
        foreach ($build->getBuildUpgrades() as $bu) {
            $items[] = [
                'upgrade' => $bu->getUpgrade()->getId(),
                'slot' => $bu->getSlot(),
            ];
        }
        return new JsonResponse([
            'id' => $build->getId(),
            'name' => $build->getName(),
            'hero' => $build->getHero()?->getId(),
            'description' => $build->getDescription(),
            'isPublic' => $build->isPublic(),
            'items' => $items,
        ]);
    }
}
