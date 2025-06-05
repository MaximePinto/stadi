<?php

namespace App\Controller\Upgrade;

use App\Entity\Upgrade;
use App\Repository\AbilityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CreateUpgradeController extends AbstractController
{
    #[Route('/api/upgrades', name: 'upgrade_create', methods: ['POST'])]
    public function __invoke(Request $request, AbilityRepository $abilityRepository, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $ability = $abilityRepository->find($data['ability'] ?? 0);
        if (!$ability) {
            return new JsonResponse(['error' => 'Ability not found'], 404);
        }
        $upgrade = new Upgrade();
        $upgrade->setAbility($ability)
            ->setName($data['name'] ?? '')
            ->setDescription($data['description'] ?? '')
            ->setCost($data['cost'] ?? 0)
            ->setEffect($data['effect'] ?? []);
        $em->persist($upgrade);
        $em->flush();
        return new JsonResponse(['id' => $upgrade->getId()], 201);
    }
}
