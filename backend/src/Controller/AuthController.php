<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Event\LogoutEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['email'], $data['password'])) {
            return new JsonResponse(['error' => 'Invalid payload'], Response::HTTP_BAD_REQUEST);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword(
            $passwordHasher->hashPassword(
                $user,
                $data['password']
            )
        );

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['status' => 'User created'], Response::HTTP_CREATED);
    }

    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(): Response
    {
        $user = $this->getUser();
        if (!$user instanceof User) {
            return new JsonResponse(['error' => 'Not authenticated'], Response::HTTP_UNAUTHORIZED);
        }
        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getUserIdentifier(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(Request $request, EventDispatcherInterface $eventDispatcher, TokenStorageInterface $tokenStorage): Response
    {
        $token = $tokenStorage->getToken();
        $eventDispatcher->dispatch(new LogoutEvent($request, $token));

        $response = new JsonResponse(['status' => 'Logged out']);
        $response->headers->clearCookie('jwt', '/', '.ddev.site', false, true, 'lax');

        return $response;
    }
}
