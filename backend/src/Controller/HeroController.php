<?php

namespace App\Controller;

use App\Entity\Hero;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api')]
class HeroController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private SerializerInterface $serializer
    ) {}

    #[Route('/heroes', name: 'api_heroes_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $role = $request->query->get('role');
        $search = $request->query->get('search');
        $page = (int) $request->query->get('page', 1);
        $limit = (int) $request->query->get('limit', 10);

        $qb = $this->em->getRepository(Hero::class)->createQueryBuilder('h');

        if ($role) {
            $qb->andWhere('h.role = :role')
               ->setParameter('role', $role);
        }

        if ($search) {
            $qb->andWhere('h.name LIKE :search OR h.description LIKE :search')
               ->setParameter('search', '%' . $search . '%');
        }

        $total = count($qb->getQuery()->getResult());
        $totalPages = ceil($total / $limit);

        $qb->setFirstResult(($page - 1) * $limit)
           ->setMaxResults($limit);

        $heroes = $qb->getQuery()->getResult();

        $data = $this->serializer->serialize($heroes, 'json', [
            'groups' => ['hero:read']
        ]);

        return new JsonResponse([
            'data' => json_decode($data),
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'totalPages' => $totalPages
        ]);
    }

    #[Route('/heroes/{id}', name: 'api_heroes_get', methods: ['GET'])]
    public function get(Hero $hero): JsonResponse
    {
        $data = $this->serializer->serialize($hero, 'json', [
            'groups' => ['hero:read']
        ]);

        return new JsonResponse(json_decode($data));
    }

    #[Route('/heroes', name: 'api_heroes_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['name'], $data['role'], $data['description'])) {
            return new JsonResponse(['error' => 'Données invalides'], Response::HTTP_BAD_REQUEST);
        }

        $hero = new Hero();
        $hero->setName($data['name']);
        $hero->setRole($data['role']);
        $hero->setDescription($data['description']);
        $hero->setImageUrl($data['imageUrl'] ?? null);

        $this->em->persist($hero);
        $this->em->flush();

        $response = $this->serializer->serialize($hero, 'json', [
            'groups' => ['hero:read']
        ]);

        return new JsonResponse(json_decode($response), Response::HTTP_CREATED);
    }

    #[Route('/heroes/{id}', name: 'api_heroes_update', methods: ['PUT'])]
    public function update(Request $request, Hero $hero): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $hero->setName($data['name']);
        }
        if (isset($data['role'])) {
            $hero->setRole($data['role']);
        }
        if (isset($data['description'])) {
            $hero->setDescription($data['description']);
        }
        if (isset($data['imageUrl'])) {
            $hero->setImageUrl($data['imageUrl']);
        }

        $this->em->flush();

        $response = $this->serializer->serialize($hero, 'json', [
            'groups' => ['hero:read']
        ]);

        return new JsonResponse(json_decode($response));
    }

    #[Route('/heroes/{id}', name: 'api_heroes_delete', methods: ['DELETE'])]
    public function delete(Hero $hero): JsonResponse
    {
        $this->em->remove($hero);
        $this->em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
