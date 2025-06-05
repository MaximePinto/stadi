<?php

namespace App\Controller\Upgrade;

use App\Repository\AbilityRepository;
use App\Repository\UpgradeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UpdateUpgradeController extends AbstractController
{
    #[Route('/api/upgrades/{id}', name: 'upgrade_update', methods: ['PUT'])]
    public function __invoke(int $id, Request $request, UpgradeRepository $upgradeRepository, AbilityRepository $abilityRepository, EntityManagerInterface $em): JsonResponse
    {
        $upgrade = $upgradeRepository->find($id);
        if (!$upgrade) {
            return new JsonResponse(['error' => 'Upgrade not found'], 404);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['ability'])) {
            $ability = $abilityRepository->find($data['ability']);
            if ($ability) {
                $upgrade->setAbility($ability);
            }
        }
        if (isset($data['name'])) {
            $upgrade->setName($data['name']);
        }
        if (isset($data['description'])) {
            $upgrade->setDescription($data['description']);
        }
        if (isset($data['cost'])) {
            $upgrade->setCost((int) $data['cost']);
        }
        if (isset($data['effect'])) {
            $upgrade->setEffect($data['effect']);
        }
        $em->flush();
        return new JsonResponse(['status' => 'ok']);
    }
}
