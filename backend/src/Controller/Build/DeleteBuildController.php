<?php

namespace App\Controller\Build;

use App\Repository\BuildRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class DeleteBuildController extends AbstractController
{
    #[Route('/api/builds/{id}', name: 'build_delete', methods: ['DELETE'])]
    public function __invoke(int $id, BuildRepository $buildRepository, EntityManagerInterface $em): JsonResponse
    {
        $build = $buildRepository->find($id);
        if (!$build) {
            return new JsonResponse(['error' => 'Build not found'], 404);
        }
        foreach ($build->getBuildUpgrades() as $bu) {
            $em->remove($bu);
        }
        $em->remove($build);
        $em->flush();
        return new JsonResponse(['status' => 'deleted']);
    }
}
