<?php

namespace App\Controller\Ability;

use App\Repository\AbilityRepository;
use App\Repository\HeroRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UpdateAbilityController extends AbstractController
{
    #[Route('/api/abilities/{id}', name: 'ability_update', methods: ['PUT'])]
    public function __invoke(int $id, Request $request, AbilityRepository $abilityRepository, HeroRepository $heroRepository, EntityManagerInterface $em): JsonResponse
    {
        $ability = $abilityRepository->find($id);
        if (!$ability) {
            return new JsonResponse(['error' => 'Ability not found'], 404);
        }
        $data = json_decode($request->getContent(), true);
        if (isset($data['hero'])) {
            $hero = $heroRepository->find($data['hero']);
            if ($hero) {
                $ability->setHero($hero);
            }
        }
        if (isset($data['name'])) {
            $ability->setName($data['name']);
        }
        if (isset($data['description'])) {
            $ability->setDescription($data['description']);
        }
        if (array_key_exists('cooldown', $data)) {
            $ability->setCooldown($data['cooldown']);
        }
        if (array_key_exists('iconUrl', $data)) {
            $ability->setIconUrl($data['iconUrl']);
        }
        $em->flush();
        return new JsonResponse(['status' => 'ok']);
    }
}
