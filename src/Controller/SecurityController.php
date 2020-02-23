<?php

namespace App\Controller;

use App\Entity\User;
use App\Security\LoginAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validator\ValidatorInterface;


class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function loginAction(AuthenticationUtils $authenticationUtils)
    {
        if ($this->isGranted('ROLE_USER')) {
            return $this->redirectToRoute('homepage');
        }

        return $this->render('login/login.html.twig', []);
    }

    /**
     * @Route("/registration", name="app_registration")
     */
    public function registrationAction(Request $request)
    {
        if ($this->isGranted('ROLE_USER')) {
            return $this->redirectToRoute('homepage');
        }

        return $this->render('registration/registration.html.twig', []);
    }

    /**
     * @Route("/reg", name="app_reg_ajax", methods={"POST"})
     */
    public function registrationAjaxAction(Request $request, ValidatorInterface $validator)
    {
        $user = new User();
        $user->setEmail($request->get('email'));
        $user->setPassword($request->get('password'));
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorResponse = [];
            foreach ($errors as $error) {
                if ($error instanceof ConstraintViolation) {
                    $errorResponse[$error->getPropertyPath()] = $error->getMessage();
                }
            }

            return new JsonResponse($errorResponse);
        } else {
            $this->getDoctrine()->getManager()->persist($user);
            $this->getDoctrine()->getManager()->flush();


            return new JsonResponse(['status' => 'ok']);
        }
    }

    /**
     * @Route("/auth", name="app_auth_ajax", methods={"POST"})
     */
    public function authAjaxAction(Request $request, ValidatorInterface $validator)
    {
        if($this->getUser() instanceof User){
            return new JsonResponse(['status' => 'ok', 'redirectUrl'=>$this->generateUrl('homepage')]);
        }
        return new JsonResponse();
    }


}
