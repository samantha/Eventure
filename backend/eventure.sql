PGDMP                         x           eventure "   10.12 (Ubuntu 10.12-2.pgdg18.04+1)     12.2 (Ubuntu 12.2-2.pgdg18.04+1) 8    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16412    eventure    DATABASE     z   CREATE DATABASE eventure WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE eventure;
                postgres    false            �            1259    16573    events    TABLE       CREATE TABLE public.events (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    from_date date NOT NULL,
    to_date date NOT NULL,
    description character varying(500) NOT NULL,
    street character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    zipcode character varying(5) NOT NULL,
    banner bytea,
    org_id integer NOT NULL,
    cancellation_policy character varying(500),
    added timestamp without time zone NOT NULL
);
    DROP TABLE public.events;
       public            postgres    false            �            1259    16571    events_id_seq    SEQUENCE     �   CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.events_id_seq;
       public          postgres    false    202            �           0    0    events_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
          public          postgres    false    201            �            1259    16603    memberships    TABLE     x   CREATE TABLE public.memberships (
    id integer NOT NULL,
    org_id integer NOT NULL,
    user_email text NOT NULL
);
    DROP TABLE public.memberships;
       public            postgres    false            �            1259    16601    memberships_id_seq    SEQUENCE     �   CREATE SEQUENCE public.memberships_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.memberships_id_seq;
       public          postgres    false    206            �           0    0    memberships_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.memberships_id_seq OWNED BY public.memberships.id;
          public          postgres    false    205            �            1259    16562    organizations    TABLE     /  CREATE TABLE public.organizations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(500) NOT NULL,
    city character varying(100) NOT NULL,
    state character varying(100) NOT NULL,
    icon bytea,
    added timestamp without time zone NOT NULL
);
 !   DROP TABLE public.organizations;
       public            postgres    false            �            1259    16560    organizations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.organizations_id_seq;
       public          postgres    false    200            �           0    0    organizations_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;
          public          postgres    false    199            �            1259    16590    socials    TABLE     �   CREATE TABLE public.socials (
    id integer NOT NULL,
    facebook character varying(100),
    twitter character varying(100),
    instagram character varying(100)
);
    DROP TABLE public.socials;
       public            postgres    false            �            1259    16588    socials_id_seq    SEQUENCE     �   CREATE SEQUENCE public.socials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.socials_id_seq;
       public          postgres    false    204            �           0    0    socials_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.socials_id_seq OWNED BY public.socials.id;
          public          postgres    false    203            �            1259    16626    tags    TABLE     ~   CREATE TABLE public.tags (
    id integer NOT NULL,
    tag character varying(100) NOT NULL,
    event_id integer NOT NULL
);
    DROP TABLE public.tags;
       public            postgres    false            �            1259    16624    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public          postgres    false    208            �           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public          postgres    false    207            �            1259    16415 
   testtable1    TABLE     1  CREATE TABLE public.testtable1 (
    id integer NOT NULL,
    first character varying(100),
    last character varying(100),
    email text NOT NULL,
    phone character varying(100),
    location character varying(100),
    hobby character varying(100),
    added timestamp without time zone NOT NULL
);
    DROP TABLE public.testtable1;
       public            postgres    false            �            1259    16413    testtable1_id_seq    SEQUENCE     �   CREATE SEQUENCE public.testtable1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.testtable1_id_seq;
       public          postgres    false    197            �           0    0    testtable1_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.testtable1_id_seq OWNED BY public.testtable1.id;
          public          postgres    false    196            �            1259    16551    users    TABLE     1  CREATE TABLE public.users (
    first character varying(100) NOT NULL,
    last character varying(100) NOT NULL,
    email text NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(100) DEFAULT 'attendee'::character varying,
    added timestamp without time zone NOT NULL
);
    DROP TABLE public.users;
       public            postgres    false            
           2604    16576 	   events id    DEFAULT     f   ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
 8   ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    202    202                       2604    16606    memberships id    DEFAULT     p   ALTER TABLE ONLY public.memberships ALTER COLUMN id SET DEFAULT nextval('public.memberships_id_seq'::regclass);
 =   ALTER TABLE public.memberships ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    206    206            	           2604    16565    organizations id    DEFAULT     t   ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);
 ?   ALTER TABLE public.organizations ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    199    200    200                       2604    16593 
   socials id    DEFAULT     h   ALTER TABLE ONLY public.socials ALTER COLUMN id SET DEFAULT nextval('public.socials_id_seq'::regclass);
 9   ALTER TABLE public.socials ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204                       2604    16629    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208                       2604    16418    testtable1 id    DEFAULT     n   ALTER TABLE ONLY public.testtable1 ALTER COLUMN id SET DEFAULT nextval('public.testtable1_id_seq'::regclass);
 <   ALTER TABLE public.testtable1 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    197    196    197            �          0    16573    events 
   TABLE DATA           �   COPY public.events (id, name, from_date, to_date, description, street, city, state, zipcode, banner, org_id, cancellation_policy, added) FROM stdin;
    public          postgres    false    202   �@       �          0    16603    memberships 
   TABLE DATA           =   COPY public.memberships (id, org_id, user_email) FROM stdin;
    public          postgres    false    206   �A       �          0    16562    organizations 
   TABLE DATA           X   COPY public.organizations (id, name, description, city, state, icon, added) FROM stdin;
    public          postgres    false    200   �A       �          0    16590    socials 
   TABLE DATA           C   COPY public.socials (id, facebook, twitter, instagram) FROM stdin;
    public          postgres    false    204   dB       �          0    16626    tags 
   TABLE DATA           1   COPY public.tags (id, tag, event_id) FROM stdin;
    public          postgres    false    208   �B       �          0    16415 
   testtable1 
   TABLE DATA           [   COPY public.testtable1 (id, first, last, email, phone, location, hobby, added) FROM stdin;
    public          postgres    false    197   �B       �          0    16551    users 
   TABLE DATA           J   COPY public.users (first, last, email, password, role, added) FROM stdin;
    public          postgres    false    198    D       �           0    0    events_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.events_id_seq', 4, true);
          public          postgres    false    201            �           0    0    memberships_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.memberships_id_seq', 1, true);
          public          postgres    false    205            �           0    0    organizations_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.organizations_id_seq', 3, true);
          public          postgres    false    199            �           0    0    socials_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.socials_id_seq', 2, true);
          public          postgres    false    203            �           0    0    tags_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.tags_id_seq', 4, true);
          public          postgres    false    207            �           0    0    testtable1_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.testtable1_id_seq', 17, true);
          public          postgres    false    196                       2606    16581    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    202                       2606    16611    memberships memberships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_pkey;
       public            postgres    false    206                       2606    16613 &   memberships memberships_user_email_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_user_email_key UNIQUE (user_email);
 P   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_user_email_key;
       public            postgres    false    206                       2606    16570     organizations organizations_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_pkey;
       public            postgres    false    200                       2606    16595    socials socials_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.socials
    ADD CONSTRAINT socials_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.socials DROP CONSTRAINT socials_pkey;
       public            postgres    false    204                       2606    16631    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    208                       2606    16425    testtable1 testtable1_email_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.testtable1
    ADD CONSTRAINT testtable1_email_key UNIQUE (email);
 I   ALTER TABLE ONLY public.testtable1 DROP CONSTRAINT testtable1_email_key;
       public            postgres    false    197                       2606    16423    testtable1 testtable1_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.testtable1
    ADD CONSTRAINT testtable1_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.testtable1 DROP CONSTRAINT testtable1_pkey;
       public            postgres    false    197                       2606    16559    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    198                        2606    16582    events events_org_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id) ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.events DROP CONSTRAINT events_org_id_fkey;
       public          postgres    false    2837    200    202            "           2606    16614 #   memberships memberships_org_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_org_id_fkey FOREIGN KEY (org_id) REFERENCES public.organizations(id);
 M   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_org_id_fkey;
       public          postgres    false    200    206    2837            #           2606    16619 '   memberships memberships_user_email_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.memberships DROP CONSTRAINT memberships_user_email_fkey;
       public          postgres    false    198    2835    206            !           2606    16596    socials socials_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.socials
    ADD CONSTRAINT socials_id_fkey FOREIGN KEY (id) REFERENCES public.organizations(id);
 A   ALTER TABLE ONLY public.socials DROP CONSTRAINT socials_id_fkey;
       public          postgres    false    200    2837    204            $           2606    16632    tags tags_event_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_event_id_fkey;
       public          postgres    false    202    208    2839            �   �   x�E�=�0E�_�6��$����U�����5����J��E
.�˹�t�g�(�2Ud��k��r���q`���;�Gޠ��##��<}��{RbWf	ͱ�r�6��$\���0��g�n\�����+����iu�j-U!z)��Ȉ0�      �   "   x�3�4�,�OJ�LuH�M���K������� h�S      �      x��A
�0 ϛW�bR��Vě�7/���51+ݨ�{KO3`R�ı�T�o�*'<ז��Q��ȇ�	��/jq��o��vk�$�-TH�/�V�0_�;�:�w~@�ǃCo�c0�5��\.*1      �   R   x�U�;�0 �Y��gq��4��b������[�۽��("��$GkS+�5UM8�.Vز8}�C��&�{��˸L�`G x+(      �   (   x�3�L��O�4�2�L)���.2�9�R�3��=... ��U      �   �   x�U��j�0���S�c)v�����6�i��4�G���[Sh���ҧ_?��٧2zx�iX}�1LS>�����V�UkMe�2�W���0���;?ů���,�?I��T'tZ;��(ð�W���<t��D��m��Օ5Z��?��r9�[�ϩ,(a-��CtҊ�Z��M�����l86NI��h��KN�D��e���g�Q����������P�6���d��ѡR��S0�~�!c�      �   z   x�e̱�  �����@	��V����r�EI�4p�����ۛ�)Q�K���r���N��kK@"�%f�ƚѸ��`1x����,�\#7!�6�7h5���P~�����}8`p�F��M+�>*�     