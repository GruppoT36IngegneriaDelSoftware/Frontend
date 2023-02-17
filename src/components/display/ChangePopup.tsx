import { useEffect, useState } from 'react';

import bcrypt from 'bcryptjs';
import { useRouter } from 'next/router';

import defInstanceAPI from '@/api/api';
import { useAuth } from '@/hooks/useAuth';
import IModeratore from '@/types/IModeratore';

type IChangePopupProps = {
  member: IModeratore;
  setViewPopup: (value: boolean) => void;
  index: number;
};

const ChangePopup = (props: IChangePopupProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [show, setShow] = useState<boolean>(true);
  const [succeeded, setSucceeded] = useState<boolean>(false);

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
      if (succeeded) router.reload();
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
      const client_salt = bcrypt.genSaltSync(12);
      const client_hash = bcrypt.hashSync(password, client_salt);
      defInstanceAPI(`/moderatore/${props.member._id}/`, {
        data: {
          nome_utente: userTr,
          client_salt,
          client_hash,
        },
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.authToken}`,
        },
        validateStatus: (status) => status < 400,
      })
        .then((r) => {
          const { status } = r;
          if (status === 200) {
            setSucceeded(true);
            setShow(false);
          }
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
        tabIndex={props.index}
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
          placeholder="Inserisci il nome utente"
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

export default ChangePopup;
