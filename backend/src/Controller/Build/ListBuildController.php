<?php

namespace App\Controller\Build;

use App\Repository\BuildRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ListBuildController extends AbstractController
{
    #[Route('/api/builds', name: 'build_list', methods: ['GET'])]
    public function __invoke(BuildRepository $buildRepository): JsonResponse
    {
        $builds = $buildRepository->findAll();
        $data = [];
        foreach ($builds as $build) {
            $data[] = [
                'id' => $build->getId(),
                'name' => $build->getName(),
                'hero' => $build->getHero()?->getId(),
            ];
        }
        return new JsonResponse($data);
    }
}
