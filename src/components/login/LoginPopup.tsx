import { createHash } from 'crypto';

import { useEffect, useState } from 'react';

import bcrypt from 'bcryptjs';

import defInstanceAPI from '@/api/api';
import { useAuth } from '@/hooks/useAuth';

type ILoginPopupProps = {
  staff?: boolean;
  setViewPopup: (value: boolean) => void;
};

const LoginPopup = (props: ILoginPopupProps) => {
  const { login } = useAuth();
  const [show, setShow] = useState<boolean>(true);

  const [nomeUtente, setNomeUtente] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleError = (err: string) => {
    setNomeUtente('');
    setPassword('');
    setError(err);
  };

  useEffect(() => {
    if (show) {
      document
        .getElementsByTagName('body')[0]
        ?.style.setProperty('overflow', 'hidden');
    } else {
      document
        .getElementsByTagName('body')[0]
        ?.style.setProperty('overflow', 'auto');
      props.setViewPopup(false);
    }
  }, [show]);

  const handleBlur = (event: any) => {
    if (!event?.currentTarget?.contains(event?.relatedTarget)) {
      setShow(false);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const userTr = nomeUtente.trim();

    if (userTr.length > 0 && password.length > 0) {
      const hashedPassword = createHash('sha256')
        .update(password)
        .digest('hex');

      if (props.staff) {
        defInstanceAPI
          .post(
            '/moderatore/login/salt',
            { nome_utente: userTr },
            { headers: { 'X-HTTP-Method-Override': 'GET' } }
          )
          .then((res) => {
            const { client_salt } = res.data;
            const client_hash = bcrypt.hashSync(password, client_salt);
            defInstanceAPI
              .post(
                '/moderatore/login',
                {
                  nome_utente: userTr,
                  client_hash,
                },
                {}
              )
              .then((r) => {
                const { data } = r;
                const { auth, isAdmin } = data;

                const token: string = auth || 'token';
                const isAd: boolean = isAdmin;

                setShow(false);

                login({
                  isLogged: true,
                  isStudente: false,
                  isStaff: true,
                  isAdmin: isAd,
                  authToken: token,
                });
              })
              .catch((err: any) => {
                if (err.response) {
                  const { status } = err.response;
                  if (status === 401) {
                    handleError('nome utente o password errati');
                  } else {
                    // error 400
                    handleError('errore, si prega di ricaricare la pagina');
                  }
                }
              });
          })
          .catch(() => {
            handleError('errore, si prega di ricaricare la pagina');
          });
      } else {
        // accesso da studente
        defInstanceAPI
          .post(
            '/studente/login',
            { matricola: userTr, password: hashedPassword },
            {}
          )
          .then((res) => {
            const { data } = res;
            const { _idp_token } = data;
            const token: string = _idp_token || 'token';

            setShow(false);

            login({
              isLogged: true,
              isStudente: true,
              isStaff: false,
              isAdmin: false,
              authToken: token,
            });
          })
          .catch((err: any) => {
            if (err.response) {
              const { status } = err.response;
              if (status === 401) {
                handleError('matricola o password errati');
              } else {
                // error 400
                handleError('errore, si prega di ricaricare la pagina');
              }
            }
          });
      }
    }
  };

  const handleUserChange = (event: any) => {
    setNomeUtente(event?.target?.value);
  };

  const handlePassChange = (event: any) => {
    setPassword(event?.target?.value);
  };

  return (
    <div className="background-blur">
      <form
        className="loginForm"
        tabIndex={2}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
      >
        {error.length > 0 && (
          <p className="font-friz-quadrata-tt text-main-primary uppercase">
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder={`Inserisci ${
            props.staff ? ' il tuo nome utente' : ' la tua matricola'
          }`}
          value={nomeUtente}
          onChange={handleUserChange}
        />
        <input
          type="password"
          placeholder="Inserisci la password"
          value={password}
          onChange={handlePassChange}
        />

        <button type="submit" onClick={handleSubmit}>
          <h2>ACCEDI</h2>
        </button>
      </form>
      <style jsx>
        {`
          .background-blur {
            @apply fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-50 backdrop-blur-sm flex place-content-center;
          }

          .loginForm {
            @apply flex flex-col px-7 py-4 space-y-2 w-[240px] place-self-center bg-main-white text-main-black rounded-2xl;
            border: 1px solid rgba(26, 27, 31, 0.25);
            box-shadow: 0px 0px 100px rgba(177, 11, 37, 0.5);
            backdrop-filter: blur(50000px);
          }
        `}
      </style>
    </div>
  );
};

export default LoginPopup;
